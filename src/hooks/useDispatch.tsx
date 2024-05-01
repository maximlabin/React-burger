import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../services/types';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()