import { FunctionComponent } from "react";

const StudentFooter: FunctionComponent = () => {
    return (
        <div className="flex justify-center bg-tertiary p-8">
            <div className="flex flex-col md:flex-row justify-between max-w-7xl w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 text-white">
                    <ul className="list-disc list-inside">
                        <li className="mb-2">Udemy Business</li>
                        <li className="mb-2">Teach on Udemy</li>
                        <li className="mb-2">Get the app</li>
                        <li className="mb-2">About us</li>
                        <li className="mb-2">Contact us</li>
                        <li className="mb-2">Careers</li>
                        <li className="mb-2">Blog</li>
                    </ul>
                    <ul className="list-disc list-inside">
                        <li className="mb-2">Help and Support</li>
                        <li className="mb-2">Affiliate</li>
                        <li className="mb-2">Investors</li>
                        <li className="mb-2">Terms</li>
                    </ul>
                    <ul className="list-disc list-inside">
                        <li className="mb-2">Privacy policy</li>
                        <li className="mb-2">Cookie settings</li>
                        <li className="mb-2">Sitemap</li>
                        <li className="mb-2">Accessibility statement</li>
                    </ul>
                </div>
                <div className="flex h-full justify-end items-end p-4">
                    <img 
                        src="/LearnX-logo.png"
                        alt="LearnX logo"
                        className='h-8 object-contain'
                    />
                </div>
            </div>
        </div>
    )
}

export default StudentFooter