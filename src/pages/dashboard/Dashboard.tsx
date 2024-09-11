import { LayoutDashboard } from "../../shared/layouts"

function Dashboard() {

    return (
      <LayoutDashboard>
        <div className="min-h-full">
          
          <main className='flex gap-2 justify-center p-5'>

            <div className='flex flex-col gap-5 justify-center items-center'>
              <div className='border-[1px] border-zinc-400 rounded-md'>
                <div className='bg-zinc-400 p-1'>
                  <p className='text-[24px] leading-none'>Membros Totais</p>
                </div>
                <div className='flex justify-center items-center'>
                  {/* <span>{users.length}</span> */}
                </div>
              </div>

              <div className='border-[1px] border-zinc-400 rounded-md'>
                <div className='bg-zinc-400 p-1'>
                  <p className='text-[24px] leading-none'>Membros Totais</p>
                </div>
                <div className='flex justify-center items-center'>
                  {/* <span>{listAdmin.length}</span> */}
                </div>
              </div>

              <div className='border-[1px] border-zinc-400 rounded-md'>
                <div className='bg-zinc-400 p-1'>
                  <p className='text-[24px] leading-none'>Membros Totais</p>
                </div>
                <div className='flex justify-center items-center'>
                  {/* <span>{textos.length}</span> */}
                </div>
              </div>
            </div>

            <div className='w-[30%] justify-center p-2 flex'>
              <div>
                <h1 className='font-montserratMedium'> Textos Publicados</h1>
                <ul className='flex flex-col'>
                </ul>
              </div>
            </div>

          </main>
        </div>
      </LayoutDashboard>
    )
  }
  
  export { Dashboard }