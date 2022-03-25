import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { createStyles, Navbar as MantineNavBar, Avatar, TextInput, Code, UnstyledButton, Badge, Text, Group, ActionIcon, Tooltip } from '@mantine/core'
import { Bulb, User, Checkbox, Search, Selector } from 'tabler-icons-react'

import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { UserButton } from './UserButton'
import { FIREBASE } from '../resources/firebase-constants'
import { Nav } from 'react-bootstrap'

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
            color: theme.colorScheme === 'dark' ? theme.white : theme.black
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

const links = [
    { photo: 'https://lh3.googleusercontent.com/a/AATXAJyEf0zXbXZL5xUN1b6Nf-rG5Uhy3NE5POhRs7WR=s96-c', label: 'Fred', notifications: 3 },
    { photo: 'https://lh3.googleusercontent.com/a/AATXAJyEf0zXbXZL5xUN1b6Nf-rG5Uhy3NE5POhRs7WR=s96-c', label: 'Bob', notifications: 4 },
    { photo: 'https://lh3.googleusercontent.com/a/AATXAJyEf0zXbXZL5xUN1b6Nf-rG5Uhy3NE5POhRs7WR=s96-c', label: 'Jack', notifications: 1 }
]

const Chats: React.FC = () => {
    FIREBASE.AUTH.onAuthStateChanged((user) => {
        if (user) {
            setUser(user)
        }
    })
    const { classes } = useStyles()
    const [chats, setChats] = React.useState<any>([])
    const [user, setUser] = React.useState<any>({})

    const mainLinks = links.map((link) => (
        <UnstyledButton key={link.label} className={classes.mainLink}>
            <div className={classes.mainLinkInner} key={uuidv4()}>
                <Avatar key={uuidv4()} size={20} className={classes.mainLinkIcon} src={link.photo} radius="xl" />

                <span key={uuidv4()}>{link.label}</span>
            </div>
            {link.notifications && (
                <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
                    {link.notifications}
                </Badge>
            )}
        </UnstyledButton>
    ))

    return (
        <MantineNavBar key={uuidv4()} height={700} width={{ sm: 300 }} p="md" className={classes.navbar}>
            <Nav.Link href="/profile" className="p-0" key={uuidv4()}>
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
            </Nav.Link>

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
                    {mainLinks}
                </div>
            </MantineNavBar.Section>
        </MantineNavBar>
    )
}

export default Chats
