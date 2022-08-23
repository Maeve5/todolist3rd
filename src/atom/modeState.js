import { atom } from 'recoil';

const modeState = atom({
    key : 'modeState',
    default : 'View'
})

export default modeState;