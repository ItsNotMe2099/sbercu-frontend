import { fetchCatalogList, setCatalogPage } from "components/catalog/actions";
import Footer from "components/layout/Footer";
import Layout from "components/layout/Layout";
import { confirmOpen, modalClose, tagModalOpen, userModalOpen } from "components/Modal/actions";
import { deleteTag } from "components/tags/Tag/actions";
import { fetchTagCategoryListByName } from "components/tags/TagCategory/actions";
import Button from "components/ui/Button";
import { deleteUser, fetchUserList, resetUserList, setUserListPage } from "components/users/actions";
import { type } from "os";
import TagCategoryModal from "pages/tags/components/TagCategoryModal";
import UserListRow from "pages/users/components/UserListRow";
import UserModal from "pages/users/components/UserModal";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IRootState, ITag, IUser } from "types";
import { logout, withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import File from "components/dashboard/File";
import Header from "components/layout/Header";
import Link from "next/link";
import TagCategory from "components/tags/TagCategory";
import InputSearch from "components/ui/Inputs/InputSearch";
import { useSelector, useDispatch } from 'react-redux'
import UsersLoader from "components/ContentLoaders/usersLoader";


const Users = (props) => {
    const dispatch = useDispatch()
    const key = useSelector((state: IRootState) => state.ModalReducer.modalKey)
    const users = useSelector((state: IRootState) => state.users.list)
    const total = useSelector((state: IRootState) => state.users.listTotal)
    const loading = useSelector((state: IRootState) => state.users.listLoading)
    const tagCategory = useSelector((state: IRootState) => state.tagCategory.list)
    const tagCategoryLoading = useSelector((state: IRootState) => state.tagCategory.listLoading)
    const [currentEditUser, setCurrentEditUser] = useState(null)
    const [filter, setFilter] = useState('')
    const [selectedTags, setSelectedTags] = useState([])
    const [sort, setSort] = useState('lastName')
    const [sortOrder, setSortOrder] = useState('ASC')
    const page = useSelector((state: IRootState) => state.users.page)

    const [isInit, setIsInit] = useState(true)
    const limit = 10;
    const handleScrollNext = () => {
        dispatch(setUserListPage(page + 1));
        console.log("PAGE", page)
        fetchList({page: page + 1});
    }
    useEffect(() => {
        if(!isInit){
            setIsInit(true);
            return;
        }
        dispatch(resetUserList());
        fetchList({page: 1});
    }, [selectedTags])


    const fetchList = (data: any = {}) => {
        let setFilter = data.search || filter;
        if(!data.search && typeof data.search !== 'undefined'){
            console.log("dataSearchDelete")
            delete data.search;
            setFilter = null;
        }
        console.log("FetchUsers", data.search, { ...(setFilter ? {search: setFilter} : {}), page:  page , limit, ...(selectedTags.length > 0 ? {departmentsIds: selectedTags.map(tag => tag.id).join(',')} : {}) ,...data});
        dispatch(fetchUserList({ ...(setFilter ? {search: setFilter} : {}), page:  page , sort, sortOrder, limit, ...(selectedTags.length > 0 ? {departmentsIds: selectedTags.map(tag => tag.id).join(',')} : {}) ,...data}))

    }
    const handleTagClick = (selectedItem, selected) => {
        console.log("HandleTagClick", selectedItem, selected)
        if (selected) {
            setSelectedTags(tags => [...tags, selectedItem])
        } else {
            setSelectedTags(tags => tags.filter(item => item.id !== selectedItem.id))
        }


    }
    useEffect(() => {
        dispatch(resetUserList());
        fetchList(1);
        dispatch(fetchTagCategoryListByName('Подразделения'));
    }, [])

    const handleEditUser = (item: ITag) => {
        setCurrentEditUser(item);
        dispatch(userModalOpen());
    }
    const handleDeleteUser = (item: IUser) => {
        dispatch(confirmOpen({
            title: 'Вы уверены, что хотите удалить пользователя?',
            description: `${item.lastName} ${item.firstName}`,
            confirmColor: 'red',
            confirmText: 'Удалить',
            onConfirm: () => {
                dispatch(deleteUser(item.id));
            }
        }));
    }
    const handleNewUserClick = () => {
        setCurrentEditUser(null);
        dispatch(userModalOpen())
    }
    const handleChangeFilter = (value) => {
        if(value.length < 3){
            if(filter) {
                dispatch(resetUserList());
                fetchList({search: null})
                setFilter(null);
            }
        return;
        }
        setFilter(value);
        dispatch(resetUserList());
        fetchList({search: value})


    }
    const renderSort = (key) => {
            if(key !== sort){
                return null;
            }
            return <img className={styles.sortOrder} src={`/img/icons/${sortOrder === 'ASC' ? 'sort_asc.svg' : 'sort_desc.svg'}`}/>
    }

    const handleSortChange = (key) => {
        if(key !== sort){
            setSort(key);
            setSortOrder('ASC');
            dispatch(resetUserList());
            fetchList({page: 1, sort: key, sortOrder: 'ASC'})
        }else{
            const newSortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
            setSortOrder(newSortOrder);
            dispatch(resetUserList());
            fetchList({page: 1, sort: key, sortOrder: newSortOrder})
        }
    }

    return (
        <Layout>
            <Header {...props}>
                <div className={styles.tagBtn}><Button transparent invite textGreen btnGreen type="button"
                                                       onClick={handleNewUserClick}>Пригласить</Button></div>
            </Header>
            <div className={styles.root}>
                {loading && total === 0 && tagCategoryLoading ?
                    <UsersLoader  showFilters={true}/>
                    :
                    <>
                        <div className={styles.title}>Пользователи</div>
                        <div className={styles.container}>
                            {tagCategory.slice(0, 1).map(item => <TagCategory hideHeader={true} green item={item}
                                                                              onTagClick={handleTagClick}
                                                                              selectedTags={selectedTags}/>)}
                        </div>
                        <div className={styles.inputContainer}>
                            <InputSearch placeholder="Введите ФИО, логин или почту пользователя" onChange={handleChangeFilter}/>
                        </div>
                        {loading && total === 0 ? <UsersLoader showFilters={false}/> :
                            <InfiniteScroll
                                dataLength={users.length + 1}
                                next={handleScrollNext}
                                loader={<div></div>}

                                style={{ overflow: "inherit" }}
                                hasMore={total !== users.length}
                                className={styles.table}
                            >
                                <div className={styles.tr}>
                                    <div className={styles.td} onClick={() => handleSortChange('lastName')}>ФИО {renderSort('lastName')}</div>
                                    <div className={styles.td} onClick={() => handleSortChange('registeredAt')}>Статус {renderSort('registeredAt')}</div>
                                    <div className={styles.td} onClick={() => handleSortChange('virtualSchoolId')}>Логин ВШ {renderSort('virtualSchoolId')}</div>
                                    <div className={styles.td} onClick={() => handleSortChange('email')}>Почта {renderSort('email')}</div>
                                    <div className={styles.td} onClick={() => handleSortChange('departmentId')}>Подразделение {renderSort('departmentId')}</div>
                                </div>
                                {users.map(user => <UserListRow user={user} onDeleteClick={handleDeleteUser}
                                                                onEditClick={handleEditUser}/>)}
                            </InfiniteScroll>
                        }

                    </>
                }
            </div>
            <UserModal isOpen={key === 'userForm'}
                       onRequestClose={() => dispatch(modalClose())} user={currentEditUser}/>
            <Footer/>
        </Layout>
    )
}

export default withAuthSync(Users)
