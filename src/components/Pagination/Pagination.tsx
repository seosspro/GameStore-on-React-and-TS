import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = {
    onPageChange: any;
    currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({
    onPageChange,
    currentPage,
}) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel='...'
            nextLabel='>'
            previousLabel='<'
            onPageChange={event => onPageChange(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
        />
    );
};

export default Pagination;
