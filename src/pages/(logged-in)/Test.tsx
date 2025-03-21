export const Test = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {/* Wrapper med perspektiv */}
            <div className="relative perspective-[1000px]">
                {/* Selve plantegningen */}
                <div className="w-[500px] h-[300px] bg-gray-300 shadow-xl transform rotate-x-[30deg] rotate-y-[15deg]">
                    {/* Bane 1 */}
                    <button className="absolute left-[50px] top-[50px] w-16 h-8 bg-blue-500 text-white"
                            onClick={() => alert('Bane 1 info')}>
                        Bane 1
                    </button>
                    {/* Bane 2 */}
                    <button className="absolute left-[200px] top-[50px] w-16 h-8 bg-green-500 text-white"
                            onClick={() => alert('Bane 2 info')}>
                        Bane 2
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Test;
