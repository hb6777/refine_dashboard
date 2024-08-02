import React from 'react'
import { CompanyList } from './list'
import {Modal, Form, Input, Select} from 'antd'
import {useModalForm, useSelect} from '@refinedev/antd'
import { CREATE_COMPANY_MUTATION } from '@/graphql/mutations'
import {  useGo } from '@refinedev/core'
import { USERS_SELECT_QUERY } from '@/graphql/queries'
import { SelectOptionWithAvatar } from '@/components'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { UsersSelectQuery } from '@/graphql/types'

 export const CreateCompany = () => {

    const go = useGo();

    const goToList = () => {
        go ({
            to: {resource:'companies', action:'list'},
            options: {keepQuery: true},
            type: 'replace',
        })
    }

    const { formProps, modalProps} = useModalForm({
        action: 'create',
        defaultVisible: true,
        resource: 'companies',
        redirect: false,
        mutationMode: 'pessimistic',
        onMutationSuccess: goToList,
        meta: {
            gqlMutation: CREATE_COMPANY_MUTATION
        }
    })

    const {selectProps, queryResult} = useSelect<GetFieldsFromList<UsersSelectQuery>>({
        resource: 'users',
        optionLabel: 'name',
        meta:{
            gqlQuery: USERS_SELECT_QUERY
        }
    })

  return (
    <CompanyList>
        <Modal
            title="Create Company"
            {...modalProps}
            mask={true}
            onCancel={goToList}
            width={512} 
        >
            <Form {...formProps} layout="vertical">
                <Form.Item 
                    label="Company Name"
                    name="name"
                    rules={[{required: true}]}
                >
                    <Input placeholder="Please enter a company name" />
                </Form.Item>
            </Form>
 
            <Form {...formProps} layout="vertical">
                <Form.Item 
                    label="Sales Owner"
                    name="salesOwnerId"
                    rules={[{required: true}]}
                >
                    <Select 
                        {...selectProps}
                        options={
                           queryResult.data?.data.map((user)=> ({
                                value: user.id,
                                label : (
                                    <SelectOptionWithAvatar 
                                        name={user.name}
                                        avatarUrl={user.avatarUrl ?? undefined}
                                        shape="circle"
                                    />
                                )
                           })) ?? []
                        }
                        placeholder="Please select a Sales Owner" />

                </Form.Item>
            </Form>
 
        </Modal>
    </CompanyList>
  )
}

// export default CreateCompany
 