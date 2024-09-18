import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  removeItem,
  selectData,
  selectLoading,
  selectError,
} from "./DataSlice";
import _ from "lodash";

const Data = () => {
  const dispatch = useDispatch();
  const datas = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchData() as any);
  }, [dispatch]);

  const handleRemove = (i: number) => {
    dispatch(removeItem(i));
  };

  if (loading) {
    return <p>loading ...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            {datas.length > 0 &&
             _.map (_.keys(datas[0]),(item) => (
                <th key={item}>{_.toUpper(item)}</th>
              ))}
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {_.map(datas,(item, i) => (
            <tr key={item.id}>
              {_.map(_.keys(item),(key) => (
                <td key={key}>{_.toString(item[key])}</td>
              ))}
              <td>
                <button onClick={() => handleRemove(i)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Data;
