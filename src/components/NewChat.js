import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useActiveChat } from 'context/ActiveChatContext';
import { useDrawer } from 'context/DrawerManager';
import useContactList from 'hooks/useContactList';
import SearchBox from 'components/SearchBox';

function NewChat() {
  return (
    <Drawer />
  )
}

function Drawer() {
  const { open, setOpen } = useDrawer()

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="dialog fixed inset-0 overflow-hidden "
        onClose={setOpen}
      >
        <div className="drawer-wrapper relative z-50 top-0 w-full h-full overflow-hidden 2xl:top-[18px] 2xl:w-[1396px] 2xl:h-[calc(100%-38px)] 2xl:mx-auto">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-0" />
          <div className="absolute inset-y-0 left-0 max-w-full min-w-[300px] w-[40%] md:w-[35%] xl:w-[30%] flex overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-out-quint duration-[350ms] sm:duration-[350ms]"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-quint duration-500 sm:duration-[500ms]"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="flex-auto flex flex-col bg-white overflow-hidden">
                <ContactListHeader />
                <SearchBox />
                <ContactList />
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function ContactListHeader() {
  const { setOpen } = useDrawer();

  return (
    <header className="h-[110px] px-4 flex flex-col justify-end flex-none bg-[#00bfa5]">
      <div className="h-16 flex items-center">
        <div className="w-[64px] flex-none">
          <Button onClick={() => setOpen(false)} className="w-10 h-10">
            <ArrowLeftIcon className="h-6 w-6 text-white" />
          </Button>
        </div>
        <h1 className="flex-auto text-white text-xl font-semibold -ml-0.5 -mt-0.5 overflow-hidden whitespace-nowrap overflow-ellipsis">
          New chat
        </h1>
      </div>
    </header>
  );
}

function Button({ children, className, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} inline-flex items-center justify-center rounded-full active:bg-black/10 transition-colors ease-out duration-300 active:duration-100`}
    >
      {children}
    </button>
  );
}

function ContactList() {
  const contactsGrouped = useContactList();

  return (
    <div className="overflow-y-auto">
      {contactsGrouped.map(cg => ([<ContactListSeperator seperator={cg.alphabet} key={cg.alphabet} />, ...cg.record.map(c => <Contact contact={c} key={c.uid} />)]))}
    </div>
  );
}

function ContactListSeperator({ seperator }) {
  return <div className="h-[72px] flex-none flex items-center pl-8 text-[#009688]  uppercase">{seperator}</div>;
}

function Contact({ contact }) {
  const {setContact: setActiveContact} = useActiveChat();
  const { setOpen } = useDrawer();

  const handleOpenChat = (e) => {
    setActiveContact(contact);
    setOpen(false);
  };

  return (
    <button
      onClick={handleOpenChat}
      className={`chat-list-item h-[72px] w-full block flex-none text-left transition-colors
        ${'bg-white hover:bg-[#f5f5f5]'}
      `}
    >
      <div className="w-full h-full flex items-stretch">
        {/* avatar */}
        <div className="pl-3.5 pr-4 flex items-center flex-none">
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              className="w-full h-full rounded-full object-cover"
              src={contact.photoURL || 'default-avatar.svg'}
              alt={contact.displayName}
            />
          </div>
        </div>
        {/* contact details */}
        <div
          className={`chat-list-item__details pr-4 flex flex-col justify-center flex-auto min-w-0 border-t
            ${'border-[#f5f5f5]'}
          `}
        >
          <div className="text-lg text-black leading-6 overflow-hidden overflow-ellipsis whitespace-nowrap">
            {contact.displayName}
          </div>
          <div className="text-sm text-black/60 leading-5 overflow-hidden overflow-ellipsis whitespace-nowrap">
            Hey there! I am using WhatsApp.
          </div>
        </div>
        {/* end */}
      </div>
    </button>
  );
}

export default NewChat;