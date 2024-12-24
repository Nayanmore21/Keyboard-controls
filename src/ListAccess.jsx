import React, { useEffect, useReducer, useState } from 'react'

const list = ['🍎 apple', '🍊 orange', '🍍 pineapple', '🍌 banana'];
const initialState = { selectedIndex: 0 };

const reducer = (state, action) => {
    switch (action.type) {
        case 'arrowUp':
            return {
                selectedIndex:
                    state.selectedIndex !== 0 ? state.selectedIndex - 1 : list.length - 1,
            };
        case 'arrowDown':
            return {
                selectedIndex:
                    state.selectedIndex !== list.length - 1 ? state.selectedIndex + 1 : 0,
            };
        case 'select':
            return { selectedIndex: action.payload };
        default:
            throw new Error();
    }
};


const ListAccess = () => {
    const useKeyPress = (targetKey) => {
        const [keyPressed, setKeyPressed] = useState(false);

        useEffect(() => {
            const downHandler = ({ key }) => {
                if (key === targetKey) {
                    setKeyPressed(true);
                }
            };

            const upHandler = ({ key }) => {
                if (key === targetKey) {
                    setKeyPressed(false);
                }
            };

            window.addEventListener('keydown', downHandler);
            window.addEventListener('keyup', upHandler);

            return () => {
                window.removeEventListener('keydown', downHandler);
                window.removeEventListener('keyup', upHandler);
            };
        }, [targetKey]);

        return keyPressed;
    };

    const arrowUpPressed = useKeyPress('ArrowUp');
    const arrowDownPressed = useKeyPress('ArrowDown');
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (arrowUpPressed) {
            dispatch({ type: 'arrowUp' });
        }
    }, [arrowUpPressed]);

    useEffect(() => {
        if (arrowDownPressed) {
            dispatch({ type: 'arrowDown' });
        }
    }, [arrowDownPressed]);



    return (
        <div>
            {list.map((item, i) => (
                <div
                    key={item}
                    onClick={() => {
                        dispatch({ type: 'select', payload: i });
                    }}
                    style={{
                        cursor: 'pointer',
                        color: i === state.selectedIndex ? 'red' : 'black',
                    }}
                >
                    {item}
                </div>
            ))}
        </div>
    )
}

export default ListAccess
