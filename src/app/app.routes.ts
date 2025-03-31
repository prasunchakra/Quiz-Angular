import { Routes } from '@angular/router';
import {StartComponent} from './pages/start/start.component';
import {CountdownComponent} from './pages/countdown/countdown.component';
import {QuizComponent} from './pages/quiz/quiz.component';
import {SummaryComponent} from './pages/summary/summary.component';
import {ResultComponent} from './pages/result/result.component';

export const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'countdown', component: CountdownComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'result', component: ResultComponent },
  { path: '**', redirectTo: '' },];
