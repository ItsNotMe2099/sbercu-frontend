import ErrorPage from 'components/ErrorPage'

export default function ErrorNotFound() {
  return <ErrorPage title={'Страница не найдена'} description={'Страница, на которую вы хотели перейти, не найдена.\nВозможно, введен некорректный адрес или страница была удалена.'} />
}
