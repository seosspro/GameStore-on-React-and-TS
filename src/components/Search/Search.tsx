import React, { useRef, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';

import { useDispatch } from 'react-redux/es/exports';
import { setSearchValue } from '../../redux/slices/filterSlice';

function Search() {
    const dispatch = useDispatch();
    const [value, setValue] = useState();

    const inputRef = useRef<HTMLInputElement>(null);

    const onClickClear = () => {
        dispatch(setSearchValue(''));
        setValue('');
        inputRef.current?.focus();
    };

    const updateSearchValue = useCallback(
        debounce(str => {
            dispatch(setSearchValue(str));
        }, 300),
        []
    );

    const onChangeInput = event => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    };

    return (
        <div className={styles.root}>
            <svg className={styles.icon}>
                <g transform='translate(576 192)'>
                    <path d='M-544.88-165.121l-7.342-7.342c-1.095,1.701-2.541,3.148-4.242,4.242l7.343,7.342c1.172,1.172,3.071,1.172,4.241,0   C-543.707-162.048-543.707-163.947-544.88-165.121z' />
                    <path d='M-552-180c0-6.627-5.373-12-12-12s-12,5.373-12,12s5.373,12,12,12S-552-173.373-552-180z M-564-171c-4.964,0-9-4.036-9-9   c0-4.963,4.036-9,9-9c4.963,0,9,4.037,9,9C-555-175.036-559.037-171-564-171z' />
                    <path d='M-571-180h2c0-2.757,2.242-5,5-5v-2C-567.86-187-571-183.858-571-180z' />
                </g>
            </svg>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={styles.input}
                placeholder='Поиск...'
            />
            {value && (
                <svg
                    onClick={onClickClear}
                    className={styles.clear}
                    enableBackground='new 0 0 32 32'
                    height='32px'
                    id='Слой_1'
                    version='1.1'
                    viewBox='0 0 32 32'
                    width='32px'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <g id='Cancel'>
                        <path
                            clipRule='evenodd'
                            d='M16,0C7.163,0,0,7.163,0,16c0,8.836,7.163,16,16,16   c8.836,0,16-7.163,16-16C32,7.163,24.836,0,16,0z M16,30C8.268,30,2,23.732,2,16C2,8.268,8.268,2,16,2s14,6.268,14,14   C30,23.732,23.732,30,16,30z'
                            fill='#121313'
                            fillRule='evenodd'
                        />
                        <path
                            clipRule='evenodd'
                            d='M22.729,21.271l-5.268-5.269l5.238-5.195   c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.39-1.034-0.39-1.428,0l-5.231,5.188l-5.309-5.31c-0.394-0.396-1.034-0.396-1.428,0   c-0.394,0.395-0.394,1.037,0,1.432l5.301,5.302l-5.331,5.287c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.429,0   l5.324-5.28l5.276,5.276c0.394,0.396,1.034,0.396,1.428,0C23.123,22.308,23.123,21.667,22.729,21.271z'
                            fill='#121313'
                            fillRule='evenodd'
                        />
                    </g>
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                </svg>
            )}
        </div>
    );
}

export default Search;
