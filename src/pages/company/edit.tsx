import { SelectOptionWithAvatar } from '@/components'
import CustomAvatar from '@/components/custom-avatar'
import { UPDATE_COMPANY_MUTATION } from '@/graphql/mutations'
import { USERS_SELECT_QUERY } from '@/graphql/queries'
import { UsersSelectQuery } from '@/graphql/types'
import { currencyNumber, getNameInitials } from '@/utilities'
import { Edit, useForm, useSelect } from '@refinedev/antd'
import { useGo } from '@refinedev/core'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { Col, Row, Form, Select, Input, InputNumber } from 'antd'
import React from 'react'
import { businessTypeOptions, companySizeOptions, industryOptions } from '../constants'
import { Text } from '@/components/text'  
import { CompanyContactsTable } from './contact-table'


export const EditCompany = () => {

    const { saveButtonProps, formProps, formLoading, queryResult } = useForm({
        redirect: false,
        meta: {
            gqlMutation: UPDATE_COMPANY_MUTATION
        }
    })

    const { name, avatarUrl } = queryResult?.data?.data || {}

    //console.log(queryResult);

    const { selectProps, queryResult: salesQueryResult } = useSelect<GetFieldsFromList<UsersSelectQuery>>({
        resource: 'users',
        optionLabel: 'name',
        pagination: {
            mode: 'off'
        },
        meta: {
            gqlQuery: USERS_SELECT_QUERY
        }
    })

    const { name: salesName, avatarUrl: salesAvatarUrl } = salesQueryResult?.data?.data || {}

    return (
        <div>
            <Row gutter={[32, 32]}>
                <Col sm={24} xl={12}>
                    <Edit
                        isLoading={formLoading}
                        saveButtonProps={saveButtonProps}
                        breadcrumb={false}
                    >
                       <Text strong>{name}</Text>
                        ­
                        ­<Form {...formProps} layout='vertical' >
                            <CustomAvatar
                                name={getNameInitials(name || '')}
                                src={avatarUrl}
                                shape='square'
                                style={{
                                    width: '96px',
                                    height: '96px',
                                    marginBottom: '24px'
                                }} />
                            <Form.Item
                                 label="Sales Owner"
                                 name="salesOwnerId"
                                 initialValue={formProps?.initialValues?.salesOwner?.id}
                            
                            >
                                <Select
                                    {...selectProps}
                                    options={
                                        salesQueryResult.data?.data.map((user) => ({
                                            value: user.id,
                                            label: (
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

                            <Form.Item
                              label="Company Size"
                              name="companySize"
                              >
                                <Select options={companySizeOptions} />
                            </Form.Item>

                            <Form.Item
                                label="Revenue"
                                name="totalRevenue"
                            >
                                  {/* <InputNumber placeholder={currencyNumber(queryResult?.data?.data.totalRevenue)} /> */}
                                  
                                <InputNumber 
                                  //  autoFocus
                                    addonBefore='$'
                                    min={0}
                                    placeholder='0.00'   
                                    decimalSeparator='.'
                                    step={0.01}  
                                 />
                            </Form.Item>

                            <Form.Item
                              label="Industry"
                               name="industry"
                              >
                                <Select options={industryOptions} />
                            </Form.Item>

                            <Form.Item
                              label="Business Type"
                               name="businessType"
                              >
                                <Select options={businessTypeOptions} />
                            </Form.Item>

                            <Form.Item
                              label="Country"
                              name="country"
                              >
                                <Input placeholder='Country' />
                            </Form.Item>

                            <Form.Item
                              label="Website"
                              name="website"
                              >
                                 <Input placeholder='Website' />
                            </Form.Item>

                        </Form>

                    </Edit>
                </Col>

                <Col sm={24} xl={12}>
                    <CompanyContactsTable />
                </Col>
            </Row> 
        </div>
    )
}

