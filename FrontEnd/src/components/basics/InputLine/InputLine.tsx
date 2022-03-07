import React, { useState, FunctionComponent } from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import * as z from 'zod';
import cn from 'classnames';
import styles from './InputLine.module.scss';
import { Icon as IconType, miscIcons } from '@icons';