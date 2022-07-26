import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
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
import { list } from './../Sort/Sort';
import { fetchGames } from '../../redux/slices/gamesSlice';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { categoryId, sort, currentPage, searchValue } = useSelector(
        state => state.filter
    );

    const { items, status } = useSelector(state => state.games);

    const onChangeCategory = React.useCallback(idx => {
        dispatch(setCategoryId(idx));
    }, []);

    const onPageChange = num => {
        dispatch(setCurrentPage(num));
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

    useEffect(() => {
        if (isMounted.current) {
            const queryString = QueryString.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            });

            navigate(`?${queryString}`);
            isMounted.current = true;
        }
    }, []);

    useEffect(() => {
        if (window.location.search) {
            const params = QueryString.parse(
                window.location.search.substring(1)
            );
            const sort = list.find(
                obj => obj.sortProperty === params.sortProperty
            );

            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            );
            isSearch.current = true;
        }
    }, []);

    useEffect(() => {
        getGames();
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);
    const games = items.map(obj => (
        <NavLink key={obj.id} to={`/Game/${obj.id}`}>
            <GameBlock {...obj} />
        </NavLink>
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
}

export default Home;
