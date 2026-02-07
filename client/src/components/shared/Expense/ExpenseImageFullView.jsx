import { removeBackgroundBlur } from "../../../redux/features/commonSlice"
import { useDispatch } from "react-redux"


export const ExpenseImageFullView = (props) => {

    const dispatch = useDispatch()

    const handleRemoveView = () => {
        props.setImageView(false)
        dispatch(removeBackgroundBlur(false))
    }

    return (
        <div className=' fixed z-[1000] bg-black w-full h-screen'>
            <button onClick={handleRemoveView} className=" absolute right-10 top-10 btn btn-soft btn-primary">Back</button>
            <img className='h-[550px] top-[45%] absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-hidden  rounded-md ' src={props.imageUrl} alt="" />
        </div>
    )
}
