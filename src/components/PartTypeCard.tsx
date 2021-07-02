import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import Link from 'next/link'
import { PartType, partTypeToText } from '../types/Part'

/**
 * PartTypeCard props.
 */
export type PartTypeCardProps = {
  loading?: boolean
  type: PartType
}

/**
 * PartTypeCard component.
 */
export const PartTypeCard: React.VFC<PartTypeCardProps> = (props) => {
  const { loading, type } = props
  const imageUrl = `/${type}.png`
  const partHref = `/${type}`

  return (
    <>
      <Card>
        {loading ? (
          <Skeleton variant="rect" height={200} />
        ) : (
          <>
            <Link href={partHref}>
              <CardActionArea>
                <CardMedia
                  className="part-type-image"
                  image={imageUrl}
                  title={type}
                />
                <CardContent>
                  <Typography variant="h6" align="center">
                    {partTypeToText(type)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>

            <style global jsx>{`
              .part-type-image {
                height: 140px;
                background-size: contain;
              }
            `}</style>
          </>
        )}
      </Card>
    </>
  )
}
