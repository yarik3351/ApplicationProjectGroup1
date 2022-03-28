import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { createStyles, Navbar as MantineNavBar, Avatar, TextInput, UnstyledButton, Badge } from '@mantine/core'
import { Login, Search, Selector } from 'tabler-icons-react'

import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore'
import { UserButton } from './UserButton'
import { FIREBASE } from '../resources/firebase-constants'
import '../styles/Chats.css'
import { Link } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
    navbar: {
        paddingTop: 0
    },

    section: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        marginBottom: theme.spacing.md,

        '&:not(:last-of-type)': {
            borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`
        }
    },

    searchCode: {
        fontWeight: 700,
        fontSize: 10,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]}`
    },

    mainLinks: {
        paddingLeft: theme.spacing.md - theme.spacing.xs,
        paddingRight: theme.spacing.md - theme.spacing.xs,
        paddingBottom: theme.spacing.md
    },

    link: {
        textDecoration: 'none',
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            textDecoration: 'none',
            cursor: 'pointer'
        }
    },

    mainLink: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        fontSize: theme.fontSizes.xs,
        padding: `8px ${theme.spacing.xs}px`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            textDecoration: 'none',
            cursor: 'pointer'
        }
    },

    mainLinkInner: {
        display: 'flex',
        alignItems: 'center',
        flex: 1
    },

    mainLinkIcon: {
        marginRight: theme.spacing.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6]
    },

    mainLinkBadge: {
        padding: 0,
        width: 20,
        height: 20,
        pointerEvents: 'none'
    },

    collections: {
        paddingLeft: theme.spacing.md - 6,
        paddingRight: theme.spacing.md - 6,
        paddingBottom: theme.spacing.md
    },

    collectionsHeader: {
        paddingLeft: theme.spacing.md + 2,
        paddingRight: theme.spacing.md,
        marginBottom: 5
    },

    collectionLink: {
        display: 'block',
        padding: `8px ${theme.spacing.xs}px`,
        textDecoration: 'none',
        borderRadius: theme.radius.sm,
        fontSize: theme.fontSizes.xs,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        lineHeight: 1,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black
        }
    }
}))

const Chats: React.FC = () => {
    const { classes } = useStyles()
    const [chats, setChats] = React.useState<any>([])
    const [user, setUser] = React.useState<any>({})

    useEffect(() => {
        const unsubscribe = FIREBASE.AUTH.onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
                return getChats(user)
            }
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const getChats = (user: any) => {
        const db = getFirestore(FIREBASE.APP)

        const ref = collection(db, 'chats')
        const q = query(ref, where('members', 'array-contains', { uid: user.uid }))
        return onSnapshot(q, (querySnapshot: any) => {
            const chats: Array<any> = []
            querySnapshot.forEach((doc: any) => {
                const data = doc.data()
                const notification_count = data.notifications.find((element: any) => element.uid === user.uid)?.count
                const chatObj = {
                    id: doc.id,
                    notification_count: notification_count === 0 ? null : notification_count,
                    ...data
                }
                chats.push(chatObj)
            })
            setChats(chats)
        })

        /* const querySnapshot = await getDocs(q)
        const chats: Array<any> = []
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            const notification_count = data.notifications.find((element: any) => element.uid === 'test')?.count
            const chatObj = {
                id: doc.id,
                notification_count: notification_count === 0 ? null : notification_count,
                ...data
            }
            chats.push(chatObj)
        }) */
    }

    const ChatsRender = chats.map((chat: any) => (
        <Link key={chat.id} to={`/chat/${chat.id}`} className={classes.link}>
            <UnstyledButton key={chat.label} className={classes.mainLink}>
                <div className={classes.mainLinkInner} key={uuidv4()}>
                    <Avatar key={uuidv4()} size={20} className={classes.mainLinkIcon} src={chat.photo_url} radius="xl" />

                    <span key={uuidv4()}>{chat.label}</span>
                </div>
                {chat.notification_count && (
                    <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
                        {chat.notification_count}
                    </Badge>
                )}
            </UnstyledButton>
        </Link>
    ))

    return (
        <MantineNavBar key={uuidv4()} width={{ sm: 300 }} p="md" className={classes.navbar}>
            <Link to="/profile" className="p-0" key={uuidv4()}>
                <MantineNavBar.Section key={uuidv4()} className={classes.section}>
                    <UserButton
                        style={{ borderBottom: '1px solid rgb(222, 226, 230)' }}
                        key={uuidv4()}
                        image={user.photoURL}
                        name={user.displayName}
                        email={user.email}
                        icon={<Selector size={14} />}
                    />
                </MantineNavBar.Section>
            </Link>

            <TextInput
                key={uuidv4()}
                placeholder="Search"
                size="xs"
                icon={<Search size={12} />}
                rightSectionWidth={70}
                styles={{ rightSection: { pointerEvents: 'none' } }}
                mb="sm"
            />

            <MantineNavBar.Section key={uuidv4()} className={classes.section}>
                <div key={uuidv4()} className={classes.mainLinks}>
                    {ChatsRender}
                </div>
            </MantineNavBar.Section>
        </MantineNavBar>
    )
}

export default Chats
