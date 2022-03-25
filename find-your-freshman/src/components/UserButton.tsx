import React from 'react'
import { UnstyledButton, UnstyledButtonProps, Group, Avatar, Text, createStyles } from '@mantine/core'
import { ChevronRight } from 'tabler-icons-react'
import { v4 as uuidv4 } from 'uuid'

const useStyles = createStyles((theme) => ({
    user: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
        }
    }
}))

interface UserButtonProps extends UnstyledButtonProps {
    image: string
    name: string
    email: string
    icon?: React.ReactNode
}

export function UserButton({ image, name, email, icon, ...others }: UserButtonProps): any {
    const { classes } = useStyles()

    return (
        <UnstyledButton key={uuidv4()} className={classes.user} {...others}>
            <Group key={uuidv4()}>
                <Avatar key={uuidv4()} src={image} radius="xl" />

                <div key={uuidv4()} style={{ flex: 1 }}>
                    <Text key={uuidv4()} size="sm" weight={500}>
                        {name}
                    </Text>

                    <Text key={uuidv4()} color="dimmed" size="xs">
                        {email}
                    </Text>
                </div>

                {icon || <ChevronRight size={14} />}
            </Group>
        </UnstyledButton>
    )
}
