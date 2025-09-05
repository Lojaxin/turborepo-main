export default function TailwindTest() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Tailwind CSS 测试
          </div>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Hello Tailwind!
          </h1>
          <p className="mt-2 text-gray-500">
            如果你能看到这个页面并且样式正确，说明 Tailwind CSS 已经成功集成到项目中。
          </p>
          <div className="mt-6">
            <div className="flex space-x-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                按钮 1
              </button>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                按钮 2
              </button>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-red-100 p-4 rounded-lg">
              <div className="text-red-800 font-semibold">红色卡片</div>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <div className="text-yellow-800 font-semibold">黄色卡片</div>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <div className="text-blue-800 font-semibold">蓝色卡片</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
