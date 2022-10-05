import React from 'react';
import styles from './index.module.css';
import { filterEmptyStr } from '../../../utils/filter';

interface IProp {
  fileDetails: any;
}

const Table0: React.FC<IProp> = (props) => {
  const fileDetails = props.fileDetails;

  return (
    <div>
      <table className={styles.detailsTable}>
        <tr>
          <th>行政处罚决定书文号</th>
          <td colSpan={3}>{ fileDetails.docNum }</td>
        </tr>
        <tr>
          <th rowSpan={3}>被处罚当事人姓名或名称</th>
        </tr>
        <tr>
          <td rowSpan={2}>个人</td>
          <td>工作单位</td>
          <td>
            { fileDetails.litigants.map((litigant: any, i: number) => 
              <span key={i}>{ filterEmptyStr(litigant.unit) + ' ' }</span>
            )}
          </td>
        </tr>
        <tr>
          <td>姓名</td>
          <td colSpan={3}>
            { fileDetails.litigants.map((litigant: any, i: number) => 
              <span key={i}>{ filterEmptyStr(litigant.name) + ' ' }</span>
            )}
          </td>
        </tr>
        <tr>
          <th>主要违法违规事实（案由）</th>
          <td colSpan={3}>{ filterEmptyStr(fileDetails.cause) }</td>
        </tr>
        <tr>
          <th>行政处罚依据</th>
          <td colSpan={3}>{ filterEmptyStr(fileDetails.basis) }</td>
        </tr>
        <tr>
          <th>行政处罚决定</th>
          <td colSpan={3}>{ filterEmptyStr(fileDetails.decision) }</td>
        </tr>
        <tr>
          <th>作出处罚决定的机关名称</th>
          <td colSpan={3}>{ filterEmptyStr(fileDetails.organ) }</td>
        </tr>
        <tr>
          <th>作出处罚决定的日期</th>
          <td colSpan={3}>{ filterEmptyStr(fileDetails.date) }</td>
        </tr>
      </table>
    </div>
  )
};

export default Table0;