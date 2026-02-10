import { useDispatch } from "react-redux"
import { removeBackgroundBlur } from "../../../redux/features/commonSlice"


export const ModelPopUp = ({ modelDataObj }) => {

    const dispatch = useDispatch(removeBackgroundBlur)

    const handleCancelModelPopUp = () => {
        modelDataObj.closeModel(false)
        dispatch(removeBackgroundBlur(false))
    }


    return (
        <div className='fixed w-96 p-5 shadow-md  bg-white top-[45%] z-[1000] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md'>
            <div className="card-body p-2">
                <h2 className="card-title text-gray-800 p-2">{modelDataObj.title}</h2>
                <p className='text-sm text-gray-500'>{modelDataObj.message}</p>
                <div className="justify-end card-actions">
                    <button disabled={modelDataObj.isLoading === true} className="btn btn-sm btn-error" onClick={modelDataObj.click}>{modelDataObj.isLoading ? modelDataObj.loadingBtnName : modelDataObj.btnName}</button>
                    <button className="btn btn-sm btn-primary" onClick={handleCancelModelPopUp}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
