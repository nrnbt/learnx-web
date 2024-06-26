import { FunctionComponent } from "react";

interface Props {
    text: string
}

const CompTitle: FunctionComponent<Props> = ({ text }) => {
    return (
        <div className="pt-8 mb-8 text-white text-[24px] md:text-[48px]">
            {text}
        </div>
    )
}

export default CompTitle