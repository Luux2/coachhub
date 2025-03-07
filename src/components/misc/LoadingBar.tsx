const LoadingBar = () => {
    return (
        <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 flex items-center justify-center h-screen">
            <div className="w-64 bg-white rounded-full overflow-hidden">
                <div
                    className="bg-teal-600 text-xl font-medium text-white flex items-center justify-center rounded-full transition-all"
                    style={{ width: "75%" }}
                >
                    75%
                </div>
            </div>
        </div>
    );
};

export default LoadingBar;
