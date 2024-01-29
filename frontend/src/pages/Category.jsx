import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const Category = () => {
  const {id} = useParams();
  const {categories} = useSelector((state)=>state.category)
  const category = categories && categories.find((item)=>item._id===id);
  return (
    <div className='mt-3 md:mt-20'>
      <h1>{category && category.title}</h1>
      {
        category.collaborators.length>0 && category.collaborators.map((item)=>(
          <div key={item}>
            {item}
          </div>
        ))
      }
    </div>
  )
}

export default Category
