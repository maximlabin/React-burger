import { useDispatch } from 'react-redux'
import type { AppDispatch, RootState } from '../services/types';
import { TypedUseSelectorHook, useSelector as selectorHook } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;