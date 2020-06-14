import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ChartsModule} from 'ng2-charts';
import { RouterTestingModule } from "@angular/router/testing";
import {Router} from '@angular/router';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {MatSnackBarModule} from '@angular/material/snack-bar';


export const imports= [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule,
  AngularFireAuthModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  MatTableModule,
  MatDividerModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule,
  MatIconModule,
  DragDropModule,
  MatRippleModule,
  ChartsModule,
  RouterTestingModule,
  MatSnackBarModule
];
