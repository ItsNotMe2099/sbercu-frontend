import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {ReactElement, useCallback, useEffect} from "react";
import * as React from 'react'

import {TourProvider as RTourProvider, useTour} from '@reactour/tour'
import {useRouter} from 'next/router'
import {fetchOnBoardingProject} from 'components/catalog/actions'
import {IRootState, IUser, UserOnBoardingStatus} from 'types'
import Router from 'next/router'
import {NavigationProps} from '@reactour/tour/dist/components/Navigation'
import cx from 'classnames'
import Button from 'components/ui/Button'
import request from 'utils/request'
import {setCookie} from 'nookies'
interface Props {
  user?: IUser,
  children: ReactElement | ReactElement[]
}
export enum Step{
  Search = 'search',
  Basket = 'basket',
  Favorite = 'favorite',
  Projects = 'projects',
  CreateFolder = 'createFolder',
  CreateFile = 'createFile',
  CatalogSort = 'catalogSort',
  CatalogDots = 'catalogDots',
  ProjectFilter = 'projectFilter',


}
const StepsContent = {
  [Step.Search]: {
    title: 'Поиск',
    content: 'Воспользуйтесь поиском для нахождения проектов, видео, файлов и спикеров.',
  },
  [Step.Basket]: {
    title: 'Корзина',
    content: 'Здесь вы найдете ваши удаленные файлы. У вас есть возможность восстановить файл, удалить навсегда или же через 30 дней он удалиться сам.',
  },
  [Step.Favorite]: {
    title: 'Избранное',
    content: 'Вы можете помечать проекты, файлы и папки “сердцами”, чтобы быстро находить их.',
  },
  [Step.Projects]: {
    title: 'Проекты',
    content: 'Хранилище информации для ваших проектов. Чтобы создать проект необходимо обратиться к админу.',
  },
  [Step.CreateFolder]: {
    title: 'Создание папки',
    content: 'В проекте вы можете создавать необходимые папки, чтобы структурировать свой проект.',
  },
  [Step.CreateFile]: {
    title: 'Загрузка файлов',
    content: 'Загружайте файлы, указывайте спикеров, привязав их к (видео) файлу.',
  },
  [Step.CatalogSort]: {
    title: 'Сортировка',
    content: 'Организуйте пространство своего проекта или папки, используйте систему сортировки.',
  },
  [Step.CatalogDots]: {
    title: 'Бургерное меню или три точки',
    content: 'С помощью данного меню вы можете выполнять ряд доступных действий: редактировать, перемещать, удалять сущности с которыми работаете.',
  },
  [Step.ProjectFilter]: {
    title: 'Фильтры',
    content: 'Находите нужное быстрее с помощью системы умных фильтров.\nВыберите из списка нужный тег и система выдаст результаты поиска.',
  },

}

const Navigation: React.FC<NavigationProps> = ({
                                                 steps,
                                                 setCurrentStep,
                                                 currentStep,
                                                 setIsOpen,
                                                 nextButton,
                                                 prevButton,
                                                 disableDots,
                                                 hideButtons,
                                                 disableAll,
                                                 rtl,

                                               }) => {
  const stepsLength = steps.length

  function clickHandler(kind) {
    if (!disableAll) {
        if (kind === 'next') {
          setCurrentStep(Math.min(currentStep + 1, stepsLength - 1))
        } else {
          setCurrentStep(Math.max(currentStep - 1, 0))
        }

    }
  }

  return (
    <div className={styles.navigation}>

      <div className={styles.dots}>
        {Array.from({ length: stepsLength }, (_, i) => i).map(index => {
          return (
            <div
              className={cx(styles.dot, {
                [styles.current]: index === currentStep,
                [styles.disabled]: disableDots || disableAll,
                [styles.notVisited]: index > currentStep,
              })}
              onClick={() => {
                if (!disableDots && !disableAll) setCurrentStep(index)
              }}
              key={`navigation_dot_${index}`}
              aria-label={
                steps[index]?.navDotAriaLabel || `Go to step ${index + 1}`
              }
            />
          )
        })}
      </div>
      <div className={styles.buttons}>
        <Button black size="9px 16px" onClick={() => clickHandler('next')} >Далее</Button>
      </div>
    </div>
  )
}
function Content({ content,currentStep, ...rest }) {
  console.log("RestProps", rest);
  const isRight = [Step.Basket, Step.Favorite, Step.CatalogSort, Step.CatalogDots].includes(content)
  return (
    <div className={styles.content}>
      <div className={cx(styles.triangle, {[styles.left]: !isRight, [styles.right]: isRight, [styles.forDots]: content === Step.CatalogDots})}/>
      <div className={styles.contentTitle}>{StepsContent[content].title}</div>
      <div className={styles.contentText}>{StepsContent[content].content}</div>
    </div>
  )
}
export default function TourProvider(props: Props){
  const dispatch = useDispatch()
  const router = useRouter();
  const tour = useTour();
  const catalog = useSelector((state: IRootState) => state.catalog)

  useEffect(() => {
    if(props.user && !catalog.onBoardingProject){
      dispatch(fetchOnBoardingProject(props.user.departmentTags[0].id))
    }
  }, [])

  const handleActionFolder =  useCallback(() => {
    console.log("onBoardingProject", Router.pathname );
    if( Router.pathname !== '/catalog/[...paths]') {
      router.push(`/catalog/${catalog.onBoardingProject.id}`)
    }
  }, [catalog]);
  const handleActionProjects =  useCallback(() => {
    console.log("routeGet", Router.pathname);
    if( Router.pathname !== '/') {
      router.push(`/`)
    }
  }, [catalog]);
  const steps = [
    {
      selector: '[data-tour="search"]',
      title: 'title',
      content: Step.Search,
    },
    {
      selector: '[data-tour="basket"]',
      content: Step.Basket,
    },
    {
      selector: '[data-tour="favorite"]',
      content: Step.Favorite,
      mutationObservables: [
        '[data-tour="projects"]'
      ],
    },
    {
      action: handleActionProjects,
      selector: '[data-tour="projects"]',
      mutationObservables: [
        '[data-tour="projects"]'
      ],
      highlightedSelectors: [
        '[data-tour="projects"]'
      ],

      content: Step.Projects,
    },
    {
      action: handleActionFolder,
      selector: '[data-tour="create-folder"]',
      highlightedSelectors: [
        '[data-tour="create-folder"]'
      ],

      mutationObservables: [
        '[data-tour="create-folder"]'
      ],
      content: Step.CreateFolder,
    },
    {
      action: handleActionFolder,
      selector: '[data-tour="create-file"]',
      content: Step.CreateFile,
      highlightedSelectors: [
        '[data-tour="create-file"]'
      ],
      mutationObservables: [
        '[data-tour="create-file"]'
      ],
    },
    {
      action: handleActionFolder,
      selector: '[data-tour="catalog-sort"]',
      content: Step.CatalogSort,
      highlightedSelectors: [
        '[data-tour="catalog-sort"]'
      ],
      mutationObservables: [
        '[data-tour="catalog-sort"]'
      ],
    },
    {
      action: handleActionFolder,
      selector: '[data-tour="catalog-menu"]',
      content: Step.CatalogDots,
      highlightedSelectors: [
        '[data-tour="catalog-menu"]'
      ],
      mutationObservables: [
        '[data-tour="catalog-menu"]'
      ],
    },
    {
      selector: '[data-tour="tag-select"]',
      mutationObservables: [
        '[data-tour="tag-select"]'
      ],
      highlightedSelectors: [
        '[data-tour="tag-select"]'
      ],

      action: handleActionProjects,
      content: Step.ProjectFilter,
    },
  ]
  const stylesObj = {
    popover: base => ({
      ...base,
      background: '#27AE60',
      borderRadius: '5px',
      padding: '20px 10px 15px 18px'
    }),
    close: base => ({ ...base, color: 'white', top: '17px'}),
    maskWrapper: base => ({
      ...base,
      color: 'transparent',
    }),

  }
  const handleClose = async (target) => {
    console.log("CloseTarget", props.user.onBoardingStatus);
    const res = await request({
      url: `/api/user/onboarding-status`,
      method: 'PUT',
      data: {
        status: UserOnBoardingStatus.Completed
      }
    });
    setCookie(null, 'onBoardingStatus', UserOnBoardingStatus.Completed, {
      maxAge: 60 * 60 * 24 * 30
    });
  }
  return (
    <RTourProvider steps={steps} beforeClose={handleClose} maskClassName={styles.mask}  highlightedMaskClassName={styles.maskHighLighted} showBadge={false} styles={stylesObj} components={{Content, Navigation}}>{props.children}</RTourProvider>
  )
}
