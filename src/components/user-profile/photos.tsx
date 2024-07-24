import { UserProfileData } from "@/services";
import PostIcon from '@/assets/icons/post-tab.svg?react';
import Loading from "../Loading";
import Image from "../image";

interface Props {
  profile?: UserProfileData;
  isLoading: boolean;
}
const Photos = ({ profile, isLoading }: Props) => {

  return (
    <div className='flex flex-col gap-3'>
      <header className="border-t border-gray-300">
        <div className="flex justify-center items-center gap-1">
          <PostIcon className='' />
          <h2 className='text-base font-medium'>Posts</h2>
        </div>
      </header>
      <div className="grid justify-center items-center min-h-[17rem]">
        {
          isLoading ? <Loading className="bg-slate-50/50 w-full h-full" /> :
            profile?.postsNum ?
              <div className='grid grid-cols-3 gap-5 text-base'>
                {profile.posts.length ?
                  profile.posts.map(post =>
                    <Image
                      key={post.docId}
                      src={post.imageSrc}
                      alt={post.caption}
                      className="rounded-lg object-cover" 
                    />
                  ) :
                  <p className='text-xl'>No post yet</p>
                }
              </div> :
              <p className='text-xl'>No post yet</p>
        }
      </div>
    </div>
  )
}

export default Photos