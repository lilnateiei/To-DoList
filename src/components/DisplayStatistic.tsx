export default function DisplayStatistic() {
const data = [{
    label: "งานที่เหลือ",
    quantity: 9
},
{
    label: "งานที่กำลังดำเนินการ",
    quantity: 5
},
{
    label: "งานที่เสร็จสิ้นแล้ว",
    quantity: 3
},
]

return (

    <div className="flex gap-4">
      {/* วนลูปสร้าง Card ตามจำนวนข้อมูลที่มี */}
      {data.map((item, index) => (
        <div 
          key={index} 
          className="w-64 h-40 rounded-xl p-5 shadow-lg shadow-gray-200 border border-gray-100 flex flex-col justify-between"
        >
          <h2 className="text-gray-500 text-sm font-medium">{item.label}</h2>
          <p className="text-4xl font-bold text-slate-900">{item.quantity}</p>
        </div>
      ))}
    </div>
    )
}