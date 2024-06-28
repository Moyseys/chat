import { Spinner } from "@nextui-org/react";

export default function Loading() {
    return (
        <>
            <div className="loading">
                <Spinner color="success" />
            </div>
        </>
    )
}