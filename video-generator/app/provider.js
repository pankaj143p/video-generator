"use client"

import { db } from '@/configs/db';
import { Users } from '../configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React ,{ useEffect } from 'react';

function Provider ({ children }) {
    const { user } = useUser();

    useEffect(() => {
        user && isNewUser();
    }, [user]);

    const isNewUser = async () => {
        const res = await db.select().from(Users)
        .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
        console.log(res);


        if (!res[0]) {
            await db.insert(Users).values({
                name: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
                imageUrl: user?.imageUrl
                // subscription: false
            })
        }

    }
    return (
        <div>
            {children}
        </div>
    );
}

export default Provider;

// "use client"

// import { useUser } from '@clerk/nextjs';
// import React, { useEffect } from 'react';

// function Provider({ children }) {
//   const { user } = useUser();

//   useEffect(() => {
//     if (user) {
//       isNewUser();
//     }
//   }, [user]);

//   const isNewUser = async () => {
//     try {
//       const res = await fetch('/api/check-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: user?.primaryEmailAddress?.emailAddress,
//           fullName: user?.fullName,
//           imageUrl: user?.profileImageUrl, // Correct this field
//         }),
//       });

//       const data = await res.json();
//       console.log(data);
//     } catch (error) {
//       console.error('Error checking or inserting user:', error);
//     }
//   };

//   return <div>{children}</div>;
// }

// export default Provider;
