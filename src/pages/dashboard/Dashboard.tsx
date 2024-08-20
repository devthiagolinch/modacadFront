import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
  } from '@headlessui/react'
  import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { api } from '../../lib/axios'
import { useEffect, useState } from 'react'

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', current: true },
    { name: 'New Post', href: '/dashboard/new-post', current: false },
    // { name: 'Membros', href: '/dashboard/members', current: false },
  ]
  const adminNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ]
  
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  interface Admin {
    id: string,
    name: string,
    email: string,
    admin_role: string,
  }

  interface Users {
    name: string,
    email: string,
    admin_role: string
  }

  interface Post {
    id: string,
    title: string,
    slug: string,
    admin_id: string,
    status: string,
    visibility: string
  }
  
function Dashboard() {
    //const {id} = useParams()
    const [admin, setAdmin] = useState<Admin>();
    const [users, setUsers] = useState<Users[]>([])
    const [listAdmin, setListAdmin] = useState<Admin[]>([])
    const [textos, setTextos] = useState<Post[]>([])
  
    useEffect(() => {
      api.get(`/admins/profile`).then(({data}) => {
        setAdmin(data)
      })      
      api.get("/post/textos").then(response => setTextos(response.data))
      
      api.get("/admins/members").then(response => setUsers(response.data))
      
      api.get("/admins/admins-list").then(({data}) => setListAdmin(data))
  
    }, [])

    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-gray-100">
          <body class="h-full">
          ```
        */}
        <div className="min-h-full">
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-8 w-8"
                          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                          alt="Your Company"
                        />
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium',
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        <button
                          type="button"
                          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">{admin?.name}</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
  
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open admin menu</span>
                              <img className="h-8 w-8 rounded-full" alt="" />
                            </MenuButton>
                          </div>
                          <Transition
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {adminNavigation.map((item) => (
                                <MenuItem key={item.name}>
                                  {({ focus }) => (
                                    <a
                                      href={item.href}
                                      className={classNames(
                                        focus ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700',
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </MenuItem>
                              ))}
                            </MenuItems>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </DisclosureButton>
                    </div>
                  </div>
                </div>
  
                <DisclosurePanel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium',
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" alt="" />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">{admin?.name}</div>
                        <div className="text-sm font-medium leading-none text-gray-400">{admin?.name}</div>
                      </div>
                      <button
                        type="button"
                        className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {adminNavigation.map((item) => (
                        <DisclosureButton
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </DisclosureButton>
                      ))}
                    </div>
                  </div>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
  
          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Olá, {admin?.name}</h1>
            </div>
          </header>
          <main className='flex gap-2 justify-center p-5'>

            <div className='flex flex-col gap-5 justify-center items-center'>
              <div className='border-[1px] border-zinc-400 rounded-md'>
                <div className='bg-zinc-400 p-1'>
                  <p className='text-[24px] leading-none'>Membros Totais</p>
                </div>
                <div className='flex justify-center items-center'>
                  <span>{users.length}</span>
                </div>
              </div>

              <div className='border-[1px] border-zinc-400 rounded-md'>
                <div className='bg-zinc-400 p-1'>
                  <p className='text-[24px] leading-none'>Membros Totais</p>
                </div>
                <div className='flex justify-center items-center'>
                  <span>{listAdmin.length}</span>
                </div>
              </div>

              <div className='border-[1px] border-zinc-400 rounded-md'>
                <div className='bg-zinc-400 p-1'>
                  <p className='text-[24px] leading-none'>Membros Totais</p>
                </div>
                <div className='flex justify-center items-center'>
                  <span>{textos.length}</span>
                </div>
              </div>
            </div>

            <div className='w-[30%] justify-center p-2 flex'>
              <div>
                <h1 className='font-montserratMedium'> Textos Publicados</h1>
                <ul className='flex flex-col'>
                  {
                    textos.map(t => {
                      return (
                        <li >
                          <a rel="stylesheet" href={`/dashboard/profile/post-editor/${t.id}`} className='flex gap-5  text-zinc-950 cursor-pointer '>
                            <div>
                              {t.title}
                            </div>
                            <div className=''>
                              {t.visibility}
                            </div>
                          </a>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>

          </main>
        </div>
      </>
    )
  }
  
  export { Dashboard }