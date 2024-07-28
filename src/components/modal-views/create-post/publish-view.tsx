import Avatar from "@/components/avatar";
import Image from "@/components/image"
import { ViewProps } from "@/hooks/use-post";
import { useUserStore } from "@/hooks/use-user-store";

const PublishView = ({ state, dispatch }: ViewProps) => {
  const { user } = useUserStore()
  const captionLength = 2000;

  if (!state.image) return null;

  const handleCaptionChange = (value: string) => {
    dispatch({ type: 'SET_CAPTION', payload: value });
  }

  return (
    <section
      className="w-full grid grid-cols-[1fr,1fr,1fr] grid-rows-[10rem,1fr] sm:grid-rows-2 gap-4 h-[calc(100%-37px)] rounded-b-lg overflow-hidden"
    >
      <div className="col-start-1 col-end-4 sm:col-start-1 sm:col-end-3 sm:row-start-1 sm:row-end-3 flex justify-center sm:justify-normal">
        <Image
          src={URL.createObjectURL(state.image)}
          alt='Post image'
          className="w-[10rem] sm:w-full h-full"
        />
      </div>
      <section className="col-start-1 col-end-4 sm:col-start-3 sm:col-end-4 sm:row-start-1 sm:row-end-3 flex flex-col">
        <header className="flex gap-2 h-10 items-center mt-2">
          <Avatar photoUrl={user?.photoUrl} className='h-8 w-8' />
          <p className='font-semibold'>{user?.username || ''}</p>
        </header>
        <textarea
          placeholder="Write a caption..."
          className="w-full h-[170px] border-none focus-visible:outline-none scrollbar-gutter"
          maxLength={captionLength}
          value={state.caption}
          onChange={(e) => handleCaptionChange(e.target.value)}
        />
        <span className="text-end mr-4">{state.caption.length}/{captionLength}</span>
      </section>
    </section>
  )
}

export default PublishView