import React, { memo, useCallback, useMemo } from 'react'
import { Table, Checkbox } from 'antd'
import { Powers, TableRoleType } from 'Src/hooks/useTableRole'

export interface TableRoleProps {
  currentRole: string
  tableCheckedKeys: string[]
  treeTableData: TableRoleType[]
  selectedTable: (values: TableRoleType[]) => void
  setTableCheckedKeys: (keys: string[]) => void
}

export default memo(function TableRole({
  currentRole,
  treeTableData,
  tableCheckedKeys,
  selectedTable,
  setTableCheckedKeys
}: TableRoleProps) {
  const changeChecked = useCallback(
    (treeList: TableRoleType[], recond: TableRoleType, values: string[], current: keyof Powers) => {
      const changeTableList = treeList.map((item) => {
        if (item.key === recond.key && item.currentPowers) {
          item.currentPowers[current] = values
          return item
        }
        if (item.children) {
          item.children = changeChecked(item.children, recond, values, current)
        }
        return item
      })
      return changeTableList
    },
    []
  )

  const columns = useMemo(() => {
    return [
      {
        title: '菜单',
        key: 'menu',
        dataIndex: 'menu',
        width: 240,
        render: (text: string, recond: TableRoleType) => <span>{recond.title}</span>
      },
      {
        title: '权限',
        key: 'powers',
        render: (text: string, recond: TableRoleType) => {
          const current = Object.keys(recond.currentPowers as Powers).find((item) => item === currentRole)
          return (
            <Checkbox.Group
              options={recond.currentPowers?.all.map((item) => ({ label: item, value: item }))}
              value={(recond.currentPowers as Powers)[current as keyof Powers]}
              onChange={(values) => {
                const list = changeChecked(treeTableData, recond, values as string[], current as keyof Powers)
                selectedTable(list)
              }}
            />
          )
        }
      }
    ]
  }, [selectedTable, currentRole, treeTableData, changeChecked])

  return (
    <Table
      size='small'
      columns={columns}
      dataSource={treeTableData}
      expandable={{
        defaultExpandAllRows: true
      }}
      rowSelection={{
        type: 'checkbox',
        fixed: true,
        selectedRowKeys: tableCheckedKeys,
        onChange: (selectedRowKeys) => {
          setTableCheckedKeys(selectedRowKeys as string[])
        }
      }}
      pagination={false}
    />
  )
})
