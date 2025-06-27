import React from 'react'
import { Link} from 'react-router-dom'
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import styles from '../styles/Username.module.css';
import { challange } from '../helper/helper'

export default function Challange() {

    
   

  const formik = useFormik({
    initialValues : {
      title : 'example12nnn3',
      quetion : 'examplenn123'
    },
    
    onSubmit : async values => {
        values = await Object.assign(values)
        let registerPromise = challange(values)
        toast.promise(registerPromise, {
          loading: 'Creating...',
          success : <b>challange created Successfully...!</b>,
          error : <b>Could not create challange.</b>
        });
    }
  })


    return (
        <div className='py-6'> 
         <Toaster position='top-center' reverseOrder={false}></Toaster>
      <form className='py-1' onSubmit={formik.handleSubmit}>
            
              
              <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('title')} className={styles.textbox} type="text" placeholder='title' />
                  <input {...formik.getFieldProps('quetion')} className={styles.textbox} type="text" placeholder='quetion' />
                  <button className={styles.btn} type='submit'>Let's Go</button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Not a Member <Link className='text-red-500' to="/register">Register Now</Link></span>
              </div>

          </form>
          
          </div>
        );
};

