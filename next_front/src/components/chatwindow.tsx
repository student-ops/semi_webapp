export default function Head() {
    // ヘッダーデザインお願い
    let tweet  :string = "hello from maemura semi"
    return(
       <>
        <header className="text-gray-600 body-font h-30 bg-indigo-500">
            <h1>hello</h1>
            <p>{tweet}</p>
        </header>
       </> 
    )
}