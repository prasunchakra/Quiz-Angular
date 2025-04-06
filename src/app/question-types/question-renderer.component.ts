import {Component, Input, ViewChild, ViewContainerRef, SimpleChanges, OnChanges, EventEmitter, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question } from '../core/models/question.model';
import { QuestionType } from '../core/enterface/question-type.enum';

// Import all components
import { McqComponent } from './mcq/mcq.component';
import { NumericComponent } from './numeric/numeric.component';
import { TrueFalseComponent } from './true-false/true-false.component';
import { FillInTheBlankComponent } from './fill-in-the-blank/fill-in-the-blank.component';
import { MatchingComponent } from './matching/matching.component';
import { OrderingComponent } from './ordering/ordering.component';
import { ShortAnswerComponent } from './short-answer/short-answer.component';
import { EssayComponent } from './essay/essay.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MultipleResponseComponent } from './multiple-response/multiple-response.component';

@Component({
  selector: 'app-question-renderer',
  imports: [CommonModule],
  template: `<ng-container #container></ng-container>`,
})
export class QuestionRendererComponent implements OnChanges, OnInit {
  @Input() question!: Question;
  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  componentMap: Record<QuestionType, any> = {
    [QuestionType.MultipleChoice]: McqComponent,
    [QuestionType.MultipleResponse]: MultipleResponseComponent,
    [QuestionType.TrueFalse]: TrueFalseComponent,
    [QuestionType.Numeric]: NumericComponent,
    [QuestionType.FillInTheBlank]: FillInTheBlankComponent,
    [QuestionType.Matching]: MatchingComponent,
    [QuestionType.Ordering]: OrderingComponent,
    [QuestionType.ShortAnswer]: ShortAnswerComponent,
    [QuestionType.Essay]: EssayComponent,
    [QuestionType.FileUpload]: FileUploadComponent,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question']) {
      this.loadComponent();
    }
  }

  ngOnInit() {
        
  }

  loadComponent() {
    const componentToRender = this.componentMap[this.question.type];
    if (!componentToRender) return;

    this.container.clear();
    const componentRef = this.container.createComponent(componentToRender);
    componentRef.setInput('question', this.question);

  }
}
