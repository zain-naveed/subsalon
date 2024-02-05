import React from "react";
import "./RequestSide.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import oneData from "./Fake1";
import columns from "./Fake1";
import twoData from "./Fake1";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

const RequestSide = () => {
  const { SearchBar } = Search;
  
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );

  const options = {
    paginationSize: 4,
    pageStartIndex: 0,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: "5",
        value: 10,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "All",
        value: oneData.twoData.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };
  return (
    <div className="requestSide">
      <ToolkitProvider keyField="id" data={oneData.twoData} columns={columns.columns} search>
        {(props) => (
          <div>
            {/* <h3>Input something at below input field:</h3> */}
            <SearchBar {...props.searchProps} />
            {/* <hr /> */}
            <BootstrapTable
              {...props.baseProps}
              keyField="id"
              data={oneData.twoData}
              columns={columns.columns}
              pagination={paginationFactory(options)}
              condensed
              striped
              hover
            />
          </div>
        )}
      </ToolkitProvider>
      {/* <BootstrapTable keyField='id' data={ oneData.twoData } columns={ columns.columns } pagination={ paginationFactory(options) } /> */}
    </div>
  );
};

export default RequestSide;
