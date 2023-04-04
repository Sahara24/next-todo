// import { useClickOutside } from "@/helpers/helper"
import { Fragment} from "react"

interface MenuContextProps {
    title:string
    clickFun: ()=>any
}



export function MenuContext({options}:{options:MenuContextProps[]}){
    // const domRef = useClickOutside(()=>{
    //     setOpen(()=>false)
    //   })
    return (
        <div className="menu-context">
            {options?.map((item, idx)=>{
                return(
                    <Fragment key={idx}>
                        <div onClick={()=>item.clickFun()} className="menu-item">{item.title}</div>
                    </Fragment>
                )
            })}
        </div>
    )
}




//  setOpen:React.Dispatch<React.SetStateAction<boolean>>