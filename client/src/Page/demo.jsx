import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton ,useUser} from '@clerk/clerk-react'

function Demo() {

  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return <p>Loading...</p>;
  console.log(user.id);
  console.log(user.imageUrl);
  console.log(user.firstName);
  console.log(user.fullName);
  console.log(user.emailAddresses[0].emailAddress);
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  )
}
export {Demo}
