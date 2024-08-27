import Layout from '../../components/Layout/Layout';
import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'

const Users = () => {
  return (
    <Layout title={"Dashboard - All Users"}>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'></div>
        </div>
        <h1> All Users </h1>
    </Layout>
  )
}

export default Users
