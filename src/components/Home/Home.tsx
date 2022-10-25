import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux/es/exports';
import { useAppDispatch } from '../../redux/store';
import { useNavigate, NavLink } from 'react-router-dom';
import QueryString from 'qs';

import {
    setCategoryId,
    setCurrentPage,
    setFilters,
} from '../../redux/slices/filterSlice';
import Categories from '../Categories/Categories';
import Sort from '../Sort/Sort';
import Preloader from '../GameBlock/Preloader';
import GameBlock from '../GameBlock/GameBlock';
import Pagination from '../Pagination/Pagination';
import { list } from '../Sort/Sort';
import { fetchGames, SearchGameParams } from '../../redux/slices/gamesSlice';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { categoryId, sort, currentPage, searchValue } = useSelector(
        (state: any) => state.filter
    );

    const { items, status } = useSelector((state: any) => state.games);

    const onChangeCategory = React.useCallback((idx: number) => {
        dispatch(setCategoryId(idx));
    }, []);

    const onPageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const getGames = async () => {
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sort.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            fetchGames({
                order,
                sortBy,
                category,
                search,
                currentPage,
            })
        );
    };

    // useEffect(() => {
    //     if (isMounted.current) {
    //         const queryString = QueryString.stringify({
    //             sortProperty: sort.sortProperty,
    //             categoryId,
    //             currentPage,
    //         });

    //         navigate(`?${queryString}`);
    //         isMounted.current = true;
    //     }
    // }, []);

    // useEffect(() => {
    //     if (window.location.search) {
    //         const params = QueryString.parse(
    //             window.location.search.substring(1)
    //         ) as unknown as SearchGameParams;
    //         const sort = list.find(obj => obj.sortProperty === params.sortBy);

    //         dispatch(
    //             setFilters({
    //                 categoryId: Number(params.category),
    //                 searchValue: params.search,
    //                 currentPage: Number(params.currentPage),
    //                 sort: sort || list[0],
    //             })
    //         );
    //         isSearch.current = true;
    //     }
    // }, []);

    useEffect(() => {
        getGames();
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);
    const games = items.map((obj: any) => (
            <GameBlock {...obj} />
    ));
    const skeletons = [...new Array(6)].map((_, index) => (
        <Preloader key={index} />
    ));

    return (
        <div className='content'>
            <div className='container'>
                <div className='content__top'>
                    <Categories
                        value={categoryId}
                        onChangeCategory={onChangeCategory}
                    />
                    <Sort />
                </div>
                <h2 className='content__title'>Все игры</h2>
                {status === 'error' ? (
                    <div>
                        <h2>Страница пустая...</h2>
                    </div>
                ) : (
                    <div className='content__items'>
                        {status === 'loading' ? skeletons : games}
                    </div>
                )}
                <Pagination
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
};

export default Home;
