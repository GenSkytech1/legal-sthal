import Link from "next/link";

export default function CommonFooter(){
    return (
        <div>
        <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
            <p className="mb-0">2025 © Legal Sthal. All Right Reserved</p>
            <p>
                Designed &amp; Developed by Gen SkyTech
                <Link href="#" className="text-primary">
                    
                </Link>
            </p>
        </div>


    </div>
    )
}