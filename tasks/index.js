import gulp from 'gulp'

import { scripts } from './webpack'
import { server }  from './server'

import { clear }  from './del'
import { html }  from './pug'
import { styles }  from './scss'
import { img }  from './image'
import { fonts }  from './fonts'

export const dev   = gulp.series( gulp.parallel(html, img, fonts, styles), server )
export const build = gulp.series( scripts )

export default dev
