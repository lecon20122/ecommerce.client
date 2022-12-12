import { Tab } from '@headlessui/react'
import HeroSlider from '@containers/hero-slider'
import { useCategoriesQuery } from '../../../framework/basic-rest/category/get-all-categories-2';
import { useRouter } from 'next/router';
import CategoryBlock from "@containers/category-block";
import { CategoryChild } from '../../../framework/basic-rest/types';

const NewArrivalsProductFeedWithTabs: React.FC<any> = () => {
  const { locale } = useRouter()
  const { data, error, isLoading } = useCategoriesQuery({})

  return (
    <div className='mb-12 md:mb-14 xl:mb-16'>
      {/* <SectionHeader
        sectionHeading='text-new-arrivals'
        className='pb-0.5 mb-1 sm:mb-1.5 md:mb-2 lg:mb-3 2xl:mb-4 3xl:mb-5'
      /> */}

      <Tab.Group as='div' className=''>
        <Tab.List as='ul' className='tab-ul'>
          {data?.map((category) => {
            return (
              <Tab
                key={category.id}
                as='li'
                className={({ selected }) =>
                  selected ? 'tab-li-selected' : 'tab-li'
                }
              >
                <p>{category.title[locale as keyof typeof category.title]}</p>
              </Tab>
            )
          })}
        </Tab.List>

        <Tab.Panels>
          {data?.map((category) => {
            category.children.map((child : CategoryChild)=>{

              
              return(
                <h1>{child.slug}</h1>
              )
            })
            return (
              <Tab.Panel key={category.id}>
                <HeroSlider
                  data={category.images}
                  variantRounded='default'
                  variant='fullWidth'
                  prevNextButtons='none'
                  className='!mb-12 !md:mb-14 !xl:mb-[60px]'
                />
                <CategoryBlock sectionHeading="text-shop-by-category" type="rounded" data={category.children} error={error} isLoading={isLoading} />
              </Tab.Panel>
            )
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default NewArrivalsProductFeedWithTabs
