const LoadingBar = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-xs bg-gray-700 rounded-full dark:bg-gray-700">
                <div
                    className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                    style={{width: "75%"}}
                >
                    70%
                </div>
            </div>
        </div>
    );
}

export default LoadingBar;