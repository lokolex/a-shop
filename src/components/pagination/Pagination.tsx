import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.css';

interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  handleClickOnPage: (page: number) => void;
}

const Pagination = (props: IPaginationProps) => {
  const { totalPages, currentPage, handleClickOnPage } = props;

  return (
    <div className="mt-5">
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => handleClickOnPage(event.selected)}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel="<"
        // initialPage={currentPage}
        forcePage={currentPage}
        marginPagesDisplayed={2}
        containerClassName={styles.wrapper}
        activeLinkClassName={styles['active-page']}
        disabledClassName={styles.disabled}
        pageLinkClassName={styles.page}
        previousLinkClassName={styles.arrow}
        nextLinkClassName={styles.arrow}
        breakLinkClassName={styles.dots}
      />
    </div>
  );
};

export default Pagination;
