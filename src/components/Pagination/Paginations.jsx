import React from "react";
import Pagination from "react-bootstrap/Pagination";

const Paginations = ({
  handlePrevious,
  handleNext,
  setPage,
  page,
  pageCount,
}) => {
  return (
    <>
      {pageCount > 0 ? (
        <div className="pagination_div d-flex justify-content-end mx-5">
          <Pagination>
            <Pagination.Prev onClick={handlePrevious} />
            {Array(pageCount)
              .fill(null)
              .map((ele, i) => {
                return (
                  <>
                    <Pagination.Item
                      active={page == i + 1 ? true : false}
                      onClick={() => setPage(i + 1)}>
                      {i + 1}
                    </Pagination.Item>
                  </>
                );
              })}

            <Pagination.Next onClick={handleNext} />
          </Pagination>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Paginations;
