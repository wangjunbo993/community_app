import { isMp } from '@uni-helper/uni-env'
import { presetUni } from '@uni-helper/unocss-preset-uni'
import presetIcons from '@unocss/preset-icons'
import transformerDirectives from '@unocss/transformer-directives'

import { defineConfig } from 'unocss'

import { presetShades } from './helpers/unocss-preset-shades/index.js'

import { primaryColor } from './src/settings/index.js'

const presets = []
const transformers = []

presets.push(presetIcons())
presets.push(presetUni({ attributify: false }))
presets.push(presetShades(primaryColor, { root: isMp ? 'page' : ':root' }))

transformers.push(transformerDirectives())

export default defineConfig({
  // @ts-ignore
  presets,
  transformers,
  shortcuts: {
    'inset-0': 'top-0 bottom-0 left-0 right-0',
    'inset-center':
      'top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2',
    'top-center': 'top-1/2 transform -translate-y-1/2',
    'left-center': 'left-1/2 transform -translate-x-1/2',
    // Flexbox 快捷方式
    'flex-center': 'flex justify-center items-center',
    'flex-between': 'flex justify-between items-center',
    'flex-start': 'flex justify-start items-center',
    'flex-end': 'flex justify-end items-center',
    'flex-col-center': 'flex flex-col justify-center items-center',
    'flex-col-between': 'flex flex-col justify-between items-center',
  },
  rules: [
    // justify-content 规则
    ['justify-start', { 'justify-content': 'flex-start' }],
    ['justify-end', { 'justify-content': 'flex-end' }],
    ['justify-center', { 'justify-content': 'center' }],
    ['justify-between', { 'justify-content': 'space-between' }],
    ['justify-around', { 'justify-content': 'space-around' }],
    ['justify-evenly', { 'justify-content': 'space-evenly' }],
    // align-items 规则
    ['items-start', { 'align-items': 'flex-start' }],
    ['items-end', { 'align-items': 'flex-end' }],
    ['items-center', { 'align-items': 'center' }],
    ['items-baseline', { 'align-items': 'baseline' }],
    ['items-stretch', { 'align-items': 'stretch' }],
    // align-content 规则
    ['content-start', { 'align-content': 'flex-start' }],
    ['content-end', { 'align-content': 'flex-end' }],
    ['content-center', { 'align-content': 'center' }],
    ['content-between', { 'align-content': 'space-between' }],
    ['content-around', { 'align-content': 'space-around' }],
    // gap 规则
    [/^gap-(.+)$/, ([, value]) => ({ gap: `${value * 0.25}rem` })],
  ],
})
