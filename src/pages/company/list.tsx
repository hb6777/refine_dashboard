import CustomAvatar from '@/components/custom-avatar';
import { Text } from '@/components/text';
import { COMPANIES_LIST_QUERY } from '@/graphql/queries';
import { Company } from '@/graphql/schema.types';
import { CompaniesListQuery } from '@/graphql/types';
import { currencyNumber } from '@/utilities/currency-number';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { CreateButton, FilterDropdown, List, useTable , EditButton, DeleteButton} from '@refinedev/antd'
import { getDefaultFilter, HttpError, useGo } from '@refinedev/core'
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { Input, Space, Table } from 'antd';
import React from 'react' 

export const CompanyList = ({children}:React.PropsWithChildren) => {

  const {tableProps, filters} = useTable 
  <
    GetFieldsFromList<CompaniesListQuery>, 
  HttpError, 
  GetFieldsFromList<CompaniesListQuery>
  > 
  ({
    resource:'companies',
    onSearch: (values) => {
        return [{
          field:'name',
          operator: 'contains',
          value: values.name,
        }]
    },
    pagination:{pageSize:12},
    sorters: {
      initial:[{
        field: 'createdAt',
        order: 'desc'
      }]
    },
    filters:{
      initial:[{
        field: 'name',
        operator: 'contains',
        value: undefined
      }]
    },
    meta:{
      gqlQuery: COMPANIES_LIST_QUERY
    }
  })

  const go = useGo();

  return (
    <div>
    <List
      breadcrumb={false}
      headerButtons={() => (
        <CreateButton
            onClick={()=>{
              go({
                to:{
                  resource:'companies',
                  action: 'create'
                },
                options:{
                  keepQuery: true
                },
                type: 'replace'
              })
            }}
        />
          )
      }
    >
      <Table
        {...tableProps}
        pagination={{
           ...tableProps.pagination
        }}
      >
        <Table.Column<Company>
          dataIndex="name"
          title="Company Title"
          defaultFilteredValue={getDefaultFilter('id', filters)}
          filterIcon={<SearchOutlined />}
          filterDropdown={(props)=>  (
            <FilterDropdown {...props}>
              <Input placeholder="Search Company ..." />
            </FilterDropdown>
          )}

          render={(value,record)=> (
            <Space>
              <CustomAvatar
                shape='square'
                name={record.name}
                src={record.avatarUrl}
              />
               <Text style={{whiteSpace:'nowrap'}}>
                {record.name}
              </Text>
            </Space>
          )}
        />

        <Table.Column<Company>
            dataIndex="totalRevenue"
            title="Open deals amount"
            render={(value, company)=>(
                <Text>
                  {currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}
                </Text>
            )}
          />
        <Table.Column<Company>
            dataIndex="id"
            title="Action"
            fixed="right"
            render={(value, company)=>(
                <Space>
                    <EditButton hideText size="small" recordItemId={value} style={{marginRight:'5px'}} />
                    <DeleteButton hideText size="small" recordItemId={value} />
                </Space>
            )}
          />

          
      </Table>
    </List>
            {children}
    </div>
  )
}
